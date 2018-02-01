class Lot < ApplicationRecord
  belongs_to :sale
  belongs_to :artist
end
