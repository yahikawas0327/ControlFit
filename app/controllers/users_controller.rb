class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all
  end

  def show
    @member = Member.find(params[:id])
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
