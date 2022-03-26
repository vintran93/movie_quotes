class Movie < ApplicationRecord
    validates :title, :uniqueness => true
    validates :title, presence: true
    has_many :characters
end
