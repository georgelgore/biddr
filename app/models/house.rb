class House < ApplicationRecord
  has_many :sales
  has_many :lots, through: :sales
end
