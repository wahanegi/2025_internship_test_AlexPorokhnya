require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  let(:valid_user) { {user: attributes_for(:user)} }
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end
  context "POST #create" do
    context "success registrations" do
      it "returns http success" do
        post :create, params: valid_user, format: :json
        expect(response).to have_http_status(:created)
      end
    end
    context "failure registrations" do
      let(:invalid_user) { {user: attributes_for(:user, email: "")} }
      it "already existing user" do
        post :create, params: valid_user, format: :json
        post :create, params: valid_user, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "registration without email" do
        post :create, params: invalid_user, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end

