# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180210202214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "high_lots", force: :cascade do |t|
    t.string "lot_number"
    t.bigint "artist_id"
    t.string "image"
    t.string "art_title"
    t.string "size_mat"
    t.integer "estimate_low"
    t.integer "estimate_high"
    t.integer "realized"
    t.bigint "sale_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "artist_name"
    t.index ["artist_id"], name: "index_high_lots_on_artist_id"
    t.index ["sale_id"], name: "index_high_lots_on_sale_id"
  end

  create_table "houses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lots", force: :cascade do |t|
    t.string "lot_number"
    t.bigint "artist_id"
    t.string "image"
    t.string "art_title"
    t.string "size_mat"
    t.integer "estimate_low"
    t.integer "estimate_high"
    t.integer "realized"
    t.bigint "sale_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_lots_on_artist_id"
    t.index ["sale_id"], name: "index_lots_on_sale_id"
  end

  create_table "sales", force: :cascade do |t|
    t.bigint "house_id"
    t.string "title"
    t.string "internal_id"
    t.date "sale_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sum"
    t.index ["house_id"], name: "index_sales_on_house_id"
  end

  create_table "top_artists", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sum"
  end

  create_table "top_sales", force: :cascade do |t|
    t.bigint "house_id"
    t.string "title"
    t.string "internal_id"
    t.date "sale_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.integer "sum"
    t.index ["house_id"], name: "index_top_sales_on_house_id"
  end

  add_foreign_key "high_lots", "artists"
  add_foreign_key "high_lots", "sales"
  add_foreign_key "lots", "artists"
  add_foreign_key "lots", "sales"
  add_foreign_key "sales", "houses"
  add_foreign_key "top_sales", "houses"
end
