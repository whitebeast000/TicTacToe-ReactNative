import React, { useState } from 'react'
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Snackbar} from 'react-native-snackbar'
import Icons from './components/Icons';
import LinearGradient from 'react-native-linear-gradient';


function App() {

const [isCross,setIsCross] = useState<boolean>(false)
const [gameWinner,setGameWinner] = useState<string>('')
const [gameState,setGameState] = useState(new Array(9).fill('empty',0,9))

const reloadGame = () =>{
  setIsCross(false)
  setGameWinner('')
  setGameState(new Array(9).fill('empty',0,9))
}


const checkIsWinner = () => {
  if (
    gameState[0] === gameState[1] && gameState[1]===gameState[2]  && gameState[0] !== 'empty'
  )
  {
    setGameWinner(`${gameState[0]} won the game!!!`);
  }

  else if (
    gameState[3] === gameState[4] && gameState[4]===gameState[5]  && gameState[3] !== 'empty'
  )
  {
    setGameWinner(`${gameState[3]} won the game!!!`);
  }

  else if (
    gameState[6] === gameState[7] && gameState[7]===gameState[8]  && gameState[6] !== 'empty'
  )
  {
    setGameWinner(`${gameState[6]} won the game!!!`);
  }

  else if (
    gameState[0] === gameState[3] && gameState[3]===gameState[6]  && gameState[0] !== 'empty'
  )
  {
    setGameWinner(`${gameState[0]} won the game!!!`);
  }

  else if (
    gameState[1] === gameState[4] && gameState[4]===gameState[7]  && gameState[1] !== 'empty'
  )
  {
    setGameWinner(`${gameState[1]} won the game!!!`);
  }

  else if (
    gameState[2] === gameState[5] && gameState[5]===gameState[8]  && gameState[2] !== 'empty'
  )
  {
    setGameWinner(`${gameState[2]} won the game!!!`);
  }

  else if (  gameState[0] === gameState[4] && gameState[4]===gameState[8]  && gameState[0] !== 'empty'  )
  {
    setGameWinner(`${gameState[0]} won the game!!!`);
  }

  else if (  gameState[2] === gameState[4] && gameState[4]===gameState[6]  && gameState[2] !== 'empty'  )
  {
    setGameWinner(`${gameState[2]} won the game!!!`);
  }

  else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }


}

const onChangeItem = (itemNumber: number) => {
  if(gameWinner)
  {
  return  Snackbar.show({
      text: gameWinner,
      backgroundColor:'green',
      textColor:'yellow'
    })
  }

  if(gameState[itemNumber] === 'empty' )
  {
    gameState[itemNumber] = isCross ? 'cross' : 'circle'
    setIsCross(!isCross)
  
  }
  else{
    return Snackbar.show({
      text:"Position is filled",
      textColor:'aqua',
      backgroundColor: 'darkblue',
    })
  }
   
  checkIsWinner()

}

  return (
    <LinearGradient
      colors={['#17132F', '#302B63', '#24243E']}
      style={styles.mainContainer}
    >

      <StatusBar />
      {gameWinner? (
          <View style={[styles.playerInfo, styles.winnerInfo,styles.glass]}>
            <Text style={[styles.winnerTxt]}>{gameWinner}</Text>
          </View>
      ):(
        <View style={[styles.playerInfo, styles.glass ]} >
             <Text style={[
                styles.gameTurnTxt,
                isCross ? styles.playerXText : styles.playerOText,
              ]} >
    Player {isCross? 'X': 'O'}'s Turn</Text>
        </View>
      )}

      <FlatList  
      numColumns={3}
      data = {gameState}
      style={[ styles.grid]}
      renderItem={({item, index}) => (
        <Pressable 
        key={index}
        style={[styles.glass, styles.card]}
        onPress={() => onChangeItem(index)} >
              <Icons name={item}/>
        </Pressable>
      )}
      />


      {/* gameAction */}
      <Pressable style={[styles.gameBtn,styles.glass]}
      onPress={()=> reloadGame()}>
        <Text style={styles.gameBtnText}>{gameWinner? 'StartNewGame': 'Reload the game'} </Text>
      </Pressable>

    </LinearGradient>
  )
}


const styles = StyleSheet.create({
  
  mainContainer:{
    flex:1,
    backgroundColor:'gold',
    paddingVertical:100
  },
  glass:{
    backgroundColor:'rgba(255,255,255,0.1)',
    borderColor:'rgba(255,255,255,0.3)',
   
    borderWidth:1,
  },
  
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerXText: {
  color: '#2DD4BF', // Teal for X
},

playerOText: {
  color: '#A78BFA', // Purple for O
},
  grid: {
    margin: 12,
    borderRadius:20,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;