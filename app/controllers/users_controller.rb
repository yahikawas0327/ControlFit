class UsersController < ApplicationController
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
