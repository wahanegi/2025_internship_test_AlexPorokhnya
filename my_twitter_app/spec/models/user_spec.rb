require 'rails_helper'

RSpec.describe User, type: :model do
  it {should validate_presence_of(:email)}
  it {should validate_presence_of(:password)}
  it {should have_many(:posts).dependent(:destroy)}

  it {should allow_value("test1@gmail.com").for(:email)}
  it {should_not allow_value("test1").for(:email)}
end