import Time "mo:base/Time";
import Array "mo:base/Array";

actor {
  type Enquiry = {
    name : Text;
    phone : Text;
    eventType : Text;
    guests : Nat;
    eventDate : Text;
    timestamp : Int;
  };

  // Legacy types -- preserved for stable variable upgrade compatibility
  type EnquiryV1 = {
    name : Text;
    phone : Text;
    email : Text;
    eventType : Text;
    eventDate : Text;
    message : Text;
    timestamp : Int;
  };
  type MapData<K, V> = { kvs : [var ?(K, V)]; var count : Nat };
  type MapInternal<K, V> = { data : MapData<K, V>; children : [var ?MapNode<K, V>] };
  type MapLeaf<K, V> = { data : MapData<K, V> };
  type MapNode<K, V> = { #leaf : MapLeaf<K, V>; #internal : MapInternal<K, V> };
  type CoreMap<K, V> = { var root : MapNode<K, V>; var size : Nat };

  // Legacy stable vars -- must never be removed (upgrade compatibility)
  stable var enquiries : CoreMap<Int, EnquiryV1> = {
    var root = #leaf { data = { kvs = [var]; var count = 0 } };
    var size = 0;
  };
  stable var enquiriesV2 : CoreMap<Int, Enquiry> = {
    var root = #leaf { data = { kvs = [var]; var count = 0 } };
    var size = 0;
  };
  stable var migratedV1 : Bool = false;

  // Active stable storage using parallel arrays
  stable var s_ids : [Nat] = [];
  stable var s_names : [Text] = [];
  stable var s_phones : [Text] = [];
  stable var s_eventTypes : [Text] = [];
  stable var s_guests : [Nat] = [];
  stable var s_eventDates : [Text] = [];
  stable var s_timestamps : [Int] = [];
  stable var nextId : Nat = 1;

  public shared func submitEnquiry(
    name : Text,
    phone : Text,
    eventType : Text,
    guests : Nat,
    eventDate : Text,
  ) : async () {
    s_ids := Array.append(s_ids, [nextId]);
    s_names := Array.append(s_names, [name]);
    s_phones := Array.append(s_phones, [phone]);
    s_eventTypes := Array.append(s_eventTypes, [eventType]);
    s_guests := Array.append(s_guests, [guests]);
    s_eventDates := Array.append(s_eventDates, [eventDate]);
    s_timestamps := Array.append(s_timestamps, [Time.now()]);
    nextId += 1;
  };

  public query func getAllEnquiries() : async [Enquiry] {
    let size = s_ids.size();
    var result : [Enquiry] = [];
    var i = 0;
    while (i < size) {
      result := Array.append(result, [{
        name = s_names[i];
        phone = s_phones[i];
        eventType = s_eventTypes[i];
        guests = s_guests[i];
        eventDate = s_eventDates[i];
        timestamp = s_timestamps[i];
      }]);
      i += 1;
    };
    Array.sort(result, func(a : Enquiry, b : Enquiry) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) #less
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    });
  };
};
