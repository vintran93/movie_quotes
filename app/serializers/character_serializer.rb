class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :quote, :likes, :image
  belongs_to :movie
end
