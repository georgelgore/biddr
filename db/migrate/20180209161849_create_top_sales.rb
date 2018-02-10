class CreateTopSales < ActiveRecord::Migration[5.1]
  def change
    create_table :top_sales do |t|
      t.belongs_to :house, foreign_key: true
      t.string :title
      t.string :internal_id
      t.date :sale_date

      t.timestamps
    end
  end
end
