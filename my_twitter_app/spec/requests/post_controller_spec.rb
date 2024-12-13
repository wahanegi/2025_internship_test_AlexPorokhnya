require 'rails_helper'
RSpec.describe Api::V1::PostsController, type: :controller do
  context "GET #index" do
    let!(:posts) { create_list(:post, 5) }

    before {get :index, format: :json}

    it "return status 200" do
      expect(response).to have_http_status(:ok)
    end
    it "returns all posts" do
      json = JSON.parse(response.body)
      expect(json.size).to eq(5)
    end
  end
  context "Post #create" do
    let!(:user) { create(:user) }
    let!(:token) do
      JWT.encode({ sub: user.id }, Rails.application.secrets.secret_key_base)
    end
    let!(:invalid_token) { "invalid_token" }
    context "valid parameters" do
      let!(:valid_post) { attributes_for(:post, user: user) }
      it "creating with valid params and authenticate user" do
        request.cookies[:auth_token] = token

        expect {
          post :create, params: { post: valid_post }, format: :json
        }.to change(Post, :count).by(1)
        expect(response).to have_http_status(:ok)
      end

      it "create with valid params but unauthenticated user" do
        request.cookies[:auth_token] = invalid_token

        expect {
          post :create, params: { post: valid_post }, format: :json
        }.to change(Post, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "invalid parameters" do
      let!(:invalid_post) { attributes_for(:post, title: "", user: user) }
      it "creating with invalid params and authenticate user" do
        request.cookies[:auth_token] = token

        expect {
          post :create, params: { post: invalid_post }, format: :json
        }.to change(Post, :count).by(0)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "creating with invalid params and unauthenticated user" do
        request.cookies[:auth_token] = invalid_token

        expect {
          post :create, params: { post: invalid_post }, format: :json
        }.to change(Post, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
