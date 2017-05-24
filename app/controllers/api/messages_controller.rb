class Api::MessagesController < ApplicationController

  def create
    @message = message_params

    Pusher.trigger('enigma-chat', 'message', {
      message: @message
    })

    render :show
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

end
