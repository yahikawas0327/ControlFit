class RelationshipsController < ApplicationController
  before_action :authenticate_member!

  def create
    @member = Member.find(params[:followed_id])
    current_member.follow(@member)
    respond_to do |format|
      format.html { redirect_to @member }
      format.js
    end
  end

  def destroy
    @member = Relationship.find(params[:id]).followed
    current_member.unfollow(@member)
    respond_to do |format|
      format.html { redirect_to @member }
      format.js
    end
  end
  private
  def logged_in_member
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end
end
