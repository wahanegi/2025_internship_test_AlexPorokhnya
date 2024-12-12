require 'rails_helper'

RSpec.describe "SessionController", type: :request do
  let(:user) {create(:user)}

  it "successfully sign in" do
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: user.confirmation_token}
    post "http://localhost:3000/users/sign_in", params: {user: {email: user.email, password: user.password}}
    expect(response).to have_http_status(200)
  end

  it "non-existent account" do
    post "http://localhost:3000/users/sign_in", params: {user: {email: Faker::Internet.email, password: user.password}}
    expect(response).to have_http_status(401)
  end

  it 'incorrect password' do
    post "http://localhost:3000/users/sign_in", params: {user: {email: Faker::Internet.email, password: Faker::Internet.password}}
    expect(response).to have_http_status(401)
  end
  it "unconfirmed email" do
    post "http://localhost:3000/users/sign_in", params: {user: {email: user.email, password: user.password}}
    expect(response).to have_http_status(401)
  end
end