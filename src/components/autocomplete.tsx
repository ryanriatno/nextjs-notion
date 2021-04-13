import React, { useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import getSearchResult from 'utils/getSearchResult'
import Link from 'next/link'

const Autocomplete = () => {
  const [results, setResults] = useState([])
  const [activeOption, setActiveOption] = useState(0)
  const [filteredOptions, setFilteredOptions] = useState([''])
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const findArticles = async (text: string) => {
    const res = await getSearchResult(text)
    setResults(res)
  }

  const debounceSave = useCallback(
    debounce((value) => findArticles(value), 1000),
    []
  )

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value
    setActiveOption(0)
    setUserInput(userInput)
    debounceSave(e.currentTarget.value)
    setShowOptions(true)
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setActiveOption(0)
    setFilteredOptions(filteredOptions)
    setShowOptions(false)
    setUserInput(e.currentTarget.innerText)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      setActiveOption(0)
      setShowOptions(false)
      setUserInput(filteredOptions[activeOption])
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(-1)
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1)
    }
  }

  let optionList
  if (showOptions && userInput) {
    if (results.length) {
      optionList = (
        <div className="absolute top-14 w-full">
          <div className="rounded-md border-gray-300 border w-full p-5">
            <ul>
              {results.map((post, index) => {
                const { title, slug } = post['item']
                let className;
                if (index === activeOption) {
                  className = 'option-active';
                }
                return (
                  <li className={className} key={title}>
                    <Link href={`/posts/${slug}`}>
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      optionList = (
        <div className="flex flex-col">
          <em>No Results!</em>
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col relative">
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder="Search articles..."
      />
      {optionList}
    </div>
  )
}

export default Autocomplete
