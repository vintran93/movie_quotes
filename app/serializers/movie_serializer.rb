class MovieSerializer < ActiveModel::Serializer
  #validates :name, :uniqueness => true
  attributes :id, :title
  has_many :characters
end
