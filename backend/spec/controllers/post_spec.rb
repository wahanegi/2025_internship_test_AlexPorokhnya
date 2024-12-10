# frozen_string_literal: true
require 'rails_helper'
RSpec.describe "PostsController", type: :request do
  before do
    Post.create(title: "First Post", body: "First Body", user_id: 129)
    Post.create(title: "Second Post", body: "Second Body",  user_id: 129)
    Post.create(title: "Third Post", body: "Third Body", user_id: 129)
  end

  it "#index" do
    get "http://127.0.0.1:3000/api/v1/posts"
    expect(response).to have_http_status(:ok)
    posts = JSON.parse(response.body)
    expect(posts.length).to eq(5)
  end
end

RSpec.describe "PostsController", type: :request do
  let(:valid_post) {{title: "First Post", body: "First Body"}}

  before do
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test6@gmail.com", password: "123456"}}
  end

  it "#create with correct data" do
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(:ok)
  end

  it "#create with blank title" do
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["title"]).to eq(["can't be blank"])
  end

  it "#create with blank body" do
    valid_post[:body] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["body"]).to eq(["can't be blank"])
  end
  it "#create blank" do
    valid_post[:body] = nil
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["body"]).to eq(["can't be blank"])
    expect(body["data"]["title"]).to eq(["can't be blank"])
  end
end

RSpec.describe "ApplicationController", type: :request do
  it "#current return signed in current user" do
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test6@gmail.com", password: "123456"}}
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(:ok)
    body = JSON.parse(response.body)
    expect(body["email"]).to eq("test6@gmail.com")
  end
  it "#current unauthorized" do
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(401)
  end
  it "#current email unconformable" do
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test7@gmail.com", password: "123456"}}
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(401)
  end
end

RSpec.describe "RegistrationController", type: :request do
  it "success registration" do
    post "http://localhost:3000/users", params: {user: {email: "test90@gmail.com", password: "123456"}}
    expect(response).to have_http_status(201)
  end

  it "user already exist" do
    post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com", password: "123456"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["has already been taken"])
  end

  it "email blank" do
    post "http://localhost:3000/users/", params: {user: {password: "123456"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["can't be blank"])
  end

  it "password blank and existing email" do
    post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["has already been taken"])
    expect(body["errors"]["password"]).to eq(["can't be blank"])
  end

  it "password blank" do
    post "http://localhost:3000/users/", params: {user: {email: "test5@gmail.com"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["password"]).to eq(["can't be blank"])
  end

  it "all fields blank" do
    post "http://localhost:3000/users/", params: {user: {}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["password"]).to eq(["can't be blank"])
    expect(body["errors"]["email"]).to eq(["can't be blank"])
  end
end
