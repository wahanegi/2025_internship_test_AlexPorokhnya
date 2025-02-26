# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

3.times do
  user = User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    confirmed_at: Time.now
  )
  2.times do
    Post.create!(
      title: Faker::Book.title,
      body: Faker::Hipster.paragraph,
      user: user,
    )
  end
end
