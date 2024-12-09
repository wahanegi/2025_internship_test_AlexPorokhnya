# frozen_string_literal: true

module Api
    module V1
      class PostsController < ApplicationController
        before_action :authenticate_user!, only: [:create]
        def index
          @posts = Post.all
          render json: @posts
        end

        def create
          @post = Post.new post_params

          if @post.save
            render json: {message: "Post successfully created", data: @post}
          else
            render json: {message: "Error creating post", data: @post.errors}, status: :unprocessable_entity
          end
        end

        private
        def post_params
          params.require(:post).permit(:title, :body)
        end
      end
  end
end