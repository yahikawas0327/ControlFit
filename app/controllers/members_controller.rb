class MembersController < ApplicationController
  def show
    @members = Member.find(params[:id])
  end
end
