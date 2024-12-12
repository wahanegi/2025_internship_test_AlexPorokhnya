require 'rails_helper'

RSpec.describe "RegistrationController", type: :request do

  let(:user) {create(:user)}

  before do
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: user.confirmation_token}
  end
  it "success registration" do
    post "http://localhost:3000/users", params: {user: {email: Faker::Internet.email,password: Faker::Internet.password}}
    expect(response).to have_http_status(201)
  end

  it "user already exist" do
    post "http://localhost:3000/users/", params: {user: {email: user.email, password: user.password}}
    expect(response).to have_http_status(422)
  end

  it "email blank" do
    post "http://localhost:3000/users/", params: {user: {password: user.password}}
    expect(response).to have_http_status(422)
  end

  it "password blank and existing email" do
    post "http://localhost:3000/users/", params: {user: {email: user.email}}
    expect(response).to have_http_status(422)
  end

  it "password blank" do
    post "http://localhost:3000/users/", params: {user: {email: Faker::Internet.email}}
    expect(response).to have_http_status(422)
  end

  it "all fields blank" do
    post "http://localhost:3000/users/", params: {user: {}}
    expect(response).to have_http_status(422)
  end
end

