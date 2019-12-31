class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @members = current_member
  end
end
