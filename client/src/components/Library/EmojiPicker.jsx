import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import "./EmojiPicker.css"

function EmojiPicker({handleEmoji}) {
  return (
    <Picker
          emojiSize={24}
          sheetSize={32}
          className="picker" data={data}
          onEmojiSelect={handleEmoji} />
  )
}

export default EmojiPicker
