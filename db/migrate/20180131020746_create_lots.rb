class CreateLots < ActiveRecord::Migration[5.1]
  def change
    create_table :lots do |t|
      t.string :lot_number
      t.belongs_to :artist, foreign_key: true
      t.string :image
      t.string :art_title
      t.string :size_mat
      t.integer :estimate_low
      t.integer :estimate_high
      t.integer :realized
      t.belongs_to :sale, foreign_key: true

      t.timestamps
    end
  end
end
