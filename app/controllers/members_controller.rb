class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @members = current_member
  end

  def following
    @members = Member.find(params[:id]).following
  end

  def followers
    @members = Member.find(params[:id]).followers
  end
end

