class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :quote
      t.string :image
      t.integer :likes
      t.integer :movie_id

    end
  end
end
