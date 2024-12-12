# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token, only: [:create]


  respond_to :json

  def create
    super do |resource|
      if resource.persisted?
        set_jwt_cookies(resource)
      end
    end
  end
  private

  def set_jwt_cookies(user)
    token = Warden::JWTAuth::UserEncoder.new.call(
      user, :user, nil
    ).first

    cookies.encrypted[:auth_token] = {
      value: token,
      same_site: :none,
      secure: true,
      httponly: true,
      expires: 1.hour.from_now
    }
  end
end
