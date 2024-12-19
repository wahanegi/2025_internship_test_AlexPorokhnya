class ApplicationController < ActionController::Base

  include ActionController::Cookies

  def current_user_processing
    token = cookies.encrypted[:auth_token]
      if token.blank?
        return {error:"Unauthorized, token is blank", status: 401 }
      end
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
        @current_user = User.find(payload["sub"])
        if @current_user.confirmed_at.nil?
          return {error: "Unconfirmed email", status: 401}
        end
        {user: @current_user}
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
        return {error: "Unauthorized, errors", status: 401 }
      end
  end
  def current
    result = current_user_processing
    if current_user_processing[:error]
      render json: {error: result[:error]}, status: 401
    else
      render json: result[:user], status: :ok
    end
  end
end
