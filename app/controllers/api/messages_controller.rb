class Api::MessagesController < ApplicationController

  def create
    @message = message_params[:message]

    Pusher.trigger('enigma-chat', 'new_message', { message: @message, username: current_user.username })

    head :ok
  end

  private

  def message_params
    params.require(:message).permit(:message)
  end

end
