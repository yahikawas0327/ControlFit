class MembersController < ApplicationController
  def show
    @members = current_member
  end
  
end
