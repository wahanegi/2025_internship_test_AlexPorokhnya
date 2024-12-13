require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:user) {create(:user)}
  let!(:token) do
    JWT.encode({ sub: user.id }, Rails.application.secrets.secret_key_base)
  end
  context 'GET #current' do
    it 'signed in current user' do
      request.cookies[:auth_token] = token
      get :current
      expect(response).to have_http_status(:ok)
    end

    it "don't have current user" do
      get :current
      expect(response).to have_http_status(:unauthorized)
    end
  end
end