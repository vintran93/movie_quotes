class Character < ApplicationRecord
    validates :name, :quote, :image, presence: true
    belongs_to :movie
end
