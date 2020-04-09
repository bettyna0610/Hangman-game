

export const getPuzzle = async (wordCount) => {
    const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    //return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
         if(response.status === 200) {
             const data = await response.json()
             return data.puzzle
         } else {
             throw new Error('Unable to fetch puzzle')
         }
    
 }

 
 