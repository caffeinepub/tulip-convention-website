import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  // New type (without email and message, with guests)
  type Enquiry = {
    name : Text;
    phone : Text;
    eventType : Text;
    guests : Nat;
    eventDate : Text;
    timestamp : Int;
  };

  // Old type used for migration
  type EnquiryV1 = {
    name : Text;
    phone : Text;
    email : Text;
    eventType : Text;
    eventDate : Text;
    message : Text;
    timestamp : Int;
  };

  module Enquiry {
    public func compareByTimestamp(e1 : Enquiry, e2 : Enquiry) : Order.Order {
      Int.compare(e2.timestamp, e1.timestamp);
    };
  };

  // Use the old type for the stable variable so it stays compatible
  stable var enquiries = Map.empty<Int, EnquiryV1>();
  stable var nextId = 1;

  // Migrate old EnquiryV1 records to new Enquiry shape
  func migrateEnquiry(v1 : EnquiryV1) : Enquiry {
    {
      name = v1.name;
      phone = v1.phone;
      eventType = v1.eventType;
      guests = 0;
      eventDate = v1.eventDate;
      timestamp = v1.timestamp;
    }
  };

  // New enquiries stored in a separate stable map with the new type
  stable var enquiriesV2 = Map.empty<Int, Enquiry>();
  stable var migratedV1 = false;

  system func postupgrade() {
    if (not migratedV1) {
      for ((id, v1) in enquiries.entries()) {
        enquiriesV2.add(id, migrateEnquiry(v1));
      };
      migratedV1 := true;
    };
  };

  public shared func submitEnquiry(
    name : Text,
    phone : Text,
    eventType : Text,
    guests : Nat,
    eventDate : Text,
  ) : async () {
    let id = nextId;
    nextId += 1;
    let timestamp = Time.now();
    let enquiry : Enquiry = {
      name;
      phone;
      eventType;
      guests;
      eventDate;
      timestamp;
    };
    enquiriesV2.add(id, enquiry);
  };

  public query func getAllEnquiries() : async [Enquiry] {
    enquiriesV2.values().toArray().sort(Enquiry.compareByTimestamp);
  };
};
