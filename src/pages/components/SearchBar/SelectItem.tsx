// import React, { useEffect, useState } from 'react'
// import SearchSelect from './SearchSelect'
// import styled from 'styled-components'
// import { useAppSelector } from '../../../helpers/hooks'
// import { collectionListProps } from '../../../service'

// const OPTIONS = [
//   {
//     id: '0',
//     tokenName: 'Filter by type',
//     tokenSymbol: 'Filter by type',
//   },
//   {
//     id: '1',
//     tokenName: 'Call',
//     tokenSymbol: 'Call',
//   },
//   {
//     id: '2',
//     tokenName: 'Put',
//     tokenSymbol: 'Put',
//   },
// ]
// const COLLECTION = [
//   {
//     id: '0',
//     tokenName: 'Filter by collection',
//     tokenSymbol: 'Filter by collection',
//   },
//   {
//     id: '1',
//     tokenName: 'Doodles',
//     tokenSymbol: 'Doodles',
//   },
//   {
//     id: '2',
//     tokenName: 'Cool Cats',
//     tokenSymbol: 'Cool Cats',
//   },
// ]
// const SelectItemBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
//   width: 280px;
//   height: 100%;

//   .shortSelect {
//     width: 124px;
//   }
//   .longSelectBox {
//     margin-left: 12px;
//     width: 153px;
//   }
// `
// export default function SelectItem() {

//   const [shortSelect, setShortSelect] = useState<any>(OPTIONS[0].tokenName)
//   const [longSelectBox, setLongSelectBox] = useState<any>(collectionList[0].tokenName)

//   useEffect(() => {
//     // console.log('collectionList', collectionList)
//   }, [collectionList])

//   return (
//     <SelectItemBox>
//       <div className="shortSelect">
//         <SearchSelect value={shortSelect} setValue={setShortSelect} options={OPTIONS} />
//       </div>
//       <div className="longSelectBox">
//         <SearchSelect value={longSelectBox} setValue={setLongSelectBox} options={collectionList} />
//       </div>
//     </SelectItemBox>
//   )
// }
