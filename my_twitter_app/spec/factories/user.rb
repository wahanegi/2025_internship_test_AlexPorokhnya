FactoryBot.define do
  factory :user do
    email {Faker::Internet.email}
    password { Faker::Internet.password }
    confirmed_at { Time.current }
  end
end