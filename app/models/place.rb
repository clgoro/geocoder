class Place < ApplicationRecord

geocoded_by :address
after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
reverse_geocoded_by :latitude, :longitude do |obj, results|
  if geo = results.first
    obj.city    = geo.city
    obj.zipcode = geo.postal_code
    obj.country = geo.country_code
  end
end
after_validation :reverse_geocode

after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
after_validation :reverse_geocode, unless: ->(obj) { obj.address.present? },
                   if: ->(obj){ obj.latitude.present? and obj.latitude_changed? and obj.longitude.present? and obj.longitude_changed? }


attr_accessor :raw_address

geocoded_by :raw_address
after_validation -> {
  self.address = self.raw_address
  geocode
}, if: ->(obj){ obj.raw_address.present? and obj.raw_address != obj.address }

after_validation :reverse_geocode, unless: ->(obj) { obj.raw_address.present? },
                 if: ->(obj){ obj.latitude.present? and obj.latitude_changed? and obj.longitude.present? and obj.longitude_changed? }
end
