const child_process = require('child_process')

function childProcessExec () {
  const CmdTaskQueue = []
  let childProcessLimit = 3

  /**
   * cycle task queue
   */
  function cycleCmdTaskQueue (cmd, fn) {
    childProcessLimit--
    child_process.exec(cmd, (error, stdout, stderr) => {
      childProcessLimit++
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.error(`${stderr}`)
      console.log(`${stdout}`)
      fn()

      if (CmdTaskQueue.length !== 0) {
        const { cmd, fn } = CmdTaskQueue.shift()
        cycleCmdTaskQueue(cmd, fn)
      }
    })
  }

  return (cmd, fn) => {
    if (childProcessLimit !== 0) {
      cycleCmdTaskQueue(cmd, fn)
    } else {
      CmdTaskQueue.push({ cmd, fn })
    }
  }
}

module.exports = {
  childProcessExec
}