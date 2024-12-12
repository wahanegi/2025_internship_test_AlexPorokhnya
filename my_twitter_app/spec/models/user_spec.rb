require 'rails_helper'

RSpec.describe User do
  let(:user) { attributes_for(:user) }

  it "successfully created user" do
    expect{
      User.create(user)
    }.to change(User, :count).by(1)
  end

  it "without email" do
    user['email'] = nil
    expect(User.create(user).save).to eq(false)
    expect(User.create(user).errors.full_messages).to eq(["Email can't be blank", "Email is invalid"])
  end

  it "without password" do
    user['password'] = nil
    expect(User.create(user).save).to eq(false)
    expect(User.create(user).errors.full_messages).to eq(["Password can't be blank"])
  end

  it "without email and password" do
    user['email'] = nil
    user['password'] = nil
    expect(User.create(user).save).to eq(false)
    expect(User.create(user).errors.full_messages).to eq(["Email can't be blank","Password can't be blank", "Email is invalid"])
  end
end