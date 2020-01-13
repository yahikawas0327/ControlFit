# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_10_025942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "blogs", force: :cascade do |t|
    t.string "title"
    t.string "area"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.boolean "foodlike", default: false
    t.integer "food_id"
    t.boolean "sportlike", default: false
    t.integer "sport_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_favorites_on_member_id"
  end

  create_table "food_databases", force: :cascade do |t|
    t.string "name"
    t.decimal "calories"
    t.decimal "protein"
    t.decimal "fat_content"
    t.decimal "carbohydrate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "food_type"
  end

  create_table "food_records", force: :cascade do |t|
    t.string "name"
    t.decimal "calories"
    t.integer "qty"
    t.string "eat_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "total_calorie"
    t.integer "member_id"
    t.index ["member_id"], name: "index_food_records_on_member_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "role", default: "user"
    t.string "provider"
    t.string "uid"
    t.string "avatar"
    t.string "name"
    t.string "gender"
    t.integer "age"
    t.integer "cm"
    t.integer "kg"
    t.index ["email"], name: "index_members_on_email", unique: true
    t.index ["reset_password_token"], name: "index_members_on_reset_password_token", unique: true
  end

  create_table "membersecrets", force: :cascade do |t|
    t.decimal "bmi"
    t.string "bmistatus"
    t.decimal "ree"
    t.decimal "bmr"
    t.decimal "tdee"
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "foodintention"
    t.string "sportintention"
    t.index ["member_id"], name: "index_membersecrets_on_member_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "sport_records", force: :cascade do |t|
    t.string "name"
    t.decimal "weight"
    t.decimal "min"
    t.decimal "totalconsum", default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "consume"
    t.integer "member_id"
    t.index ["member_id"], name: "index_sport_records_on_member_id"
  end

  create_table "sports", force: :cascade do |t|
    t.string "name"
    t.string "consume"
    t.string "consume_40kg"
    t.string "consume_50kg"
    t.string "consume_60kg"
    t.string "consume_70kg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "computed", default: "0.0"
  end

  create_table "statistics", force: :cascade do |t|
    t.decimal "sportsum"
    t.integer "sportcount"
    t.decimal "foodsum"
    t.integer "foodcount"
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_statistics_on_member_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "favorites", "members"
  add_foreign_key "membersecrets", "members"
  add_foreign_key "statistics", "members"
end
