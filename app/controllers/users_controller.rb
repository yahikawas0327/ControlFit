class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all.with_attached_cover_image
  end

  def show
    @member = Member.all.find(params[:id])
  end

  def new
  end

  def edit
  end

  def updata
  end

  def destroy
  end
end
