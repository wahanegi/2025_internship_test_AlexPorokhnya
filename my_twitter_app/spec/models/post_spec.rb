require 'rails_helper'

# frozen_string_literal: true

RSpec.describe type: :model do
  let(:user) {create(:user)}
  before do
    create(:post, user: user)
    create(:post, user: user)
  end

  it '#index return all posts' do
    expect(Post.all.count).to eq(2)
  end
end

RSpec.describe "PostsController", type: :model do
  let(:user) {create(:user)}
  let(:valid_post) {attributes_for(:post, user_id: user.id)}

  it "#create with correct data" do
    expect{
      Post.create(valid_post)
    }.to change(Post, :count).by(1)
  end

  it "#create with blank title" do
    valid_post[:title] = nil
    expect(Post.create(valid_post).save).to eq(false)
    expect(Post.create(valid_post).errors.full_messages).to eq(["Title can't be blank"])
  end

  it "#create with blank body" do
    valid_post[:body] = nil
    expect(Post.create(valid_post).save).to eq(false)
    expect(Post.create(valid_post).errors.full_messages).to eq(["Body can't be blank"])
  end
  it "#create blank" do
    valid_post[:title] = nil
    valid_post[:body] = nil
    expect(Post.create(valid_post).save).to eq(false)
    expect(Post.create(valid_post).errors.full_messages).to eq(["Title can't be blank", "Body can't be blank"])
  end
end

#
# RSpec.describe "RegistrationController", type: :request do
#   before do
#     user = User.create(email: "test1@gmail.com", password: "password")
#     confirmation_token = user.confirmation_token
#     Rails.logger.info(confirmation_token)
#     get "http://localhost:3000/users/confirmation", params: {confirmation_token: confirmation_token}
#   end
#   it "success registration" do
#     post "http://localhost:3000/users", params: {user: {email: "test90@gmail.com", password: "123456"}}
#     expect(response).to have_http_status(201)
#   end
#
#   it "user already exist" do
#     post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com", password: "password"}}
#     expect(response).to have_http_status(422)
#     body = JSON.parse(response.body)
#     expect(body["errors"]["email"]).to eq(["has already been taken"])
#   end
#
#   it "email blank" do
#     post "http://localhost:3000/users/", params: {user: {password: "123456"}}
#     expect(response).to have_http_status(422)
#     body = JSON.parse(response.body)
#     expect(body["errors"]["email"]).to eq(["can't be blank"])
#   end
#
#   it "password blank and existing email" do
#     post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com"}}
#     expect(response).to have_http_status(422)
#     body = JSON.parse(response.body)
#     expect(body["errors"]["email"]).to eq(["has already been taken"])
#     expect(body["errors"]["password"]).to eq(["can't be blank"])
#   end
#
#   it "password blank" do
#     post "http://localhost:3000/users/", params: {user: {email: "test5@gmail.com"}}
#     expect(response).to have_http_status(422)
#     body = JSON.parse(response.body)
#     expect(body["errors"]["password"]).to eq(["can't be blank"])
#   end
#
#   it "all fields blank" do
#     post "http://localhost:3000/users/", params: {user: {}}
#     expect(response).to have_http_status(422)
#     body = JSON.parse(response.body)
#     expect(body["errors"]["password"]).to eq(["can't be blank"])
#     expect(body["errors"]["email"]).to eq(["can't be blank"])
#   end
# end
#
