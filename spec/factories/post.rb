FactoryBot.define do
  factory :post do
    title {Faker::Lorem.words(number: 3).join(' ')}
    body {Faker::Lorem.paragraph}
    association :user
  end
end