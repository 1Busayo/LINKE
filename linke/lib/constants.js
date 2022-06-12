import contractArtifact from './ProfileImageNfts.json'
import  contractTip from './LinkeTip.json'

//export const contractAdress ="0xDdB114461415F31A11412543dC3C56B634e3Ad7F"
//export const contractAdress ="0xA8FcA9Ed24745c9CfD04B8C9A8159d70dF4D4635"

export const contractAddress='0x150A443F5d75860F0BCe910d55d7dDcC5cB86835'

export const contractABI =contractArtifact.abi

export const contracTipABI = contractTip.abi


export const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '',
      padding: 0,
      border: 'none',
    },
    overlay: {
      backgroundColor: '#334250a7',
    },
  }