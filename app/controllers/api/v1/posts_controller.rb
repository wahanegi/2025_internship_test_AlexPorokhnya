# frozen_string_literal: true
module Api
  module V1
    class PostsController < ApplicationController
      before_action :authenticate_user!, only: [:create, :update]
      before_action :set_post, only: [:update, :destroy]
      skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
      def index
        @posts = Post.joins(:user).select("posts.*, users.email AS email").order("posts.created_at DESC")

        formated_posts = @posts.map do |post|
          post.attributes.merge(
            email: post.email,
            title: post.title,
            body: post.body,
            created_at: post.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            updated_at: post.updated_at.strftime('%Y-%m-%d %H:%M:%S')
          )
        end
        render json: formated_posts
      end

      def create
        @post = Post.new post_params.merge(:user_id => current_user.id)

        if @post.save
          render json: {message: "Post successfully created", data: @post}
        else
          render json: {message: "Error creating post", data: @post.errors}, status: :unprocessable_entity
        end
      end

      def update
        if @post.update(post_params)
          render json: {message: "Post successfully updated", data: @post}
        else
          render json: {message: "Error updating post", data: @post.errors}, status: :unprocessable_entity
        end
      end

      def destroy
        if @post.destroy
          render json: {message: "Post successfully deleted", data: @post}
        else
          render json: {message: "Error deleting post", data: @post.errors}, status: :unprocessable_entity
        end
      end

      private
      def post_params
        params.require(:post).permit(:title, :body)
      end

      def set_post
        @post = Post.find(params[:id])
      end
      def authenticate_user!
        result = current_user_processing

        if result[:error]
          render json: {error: result[:error]}, status: :unauthorized
        else
          @current_user = result[:user]
        end
      end
    end
  end
end