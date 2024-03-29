import React, { useEffect, useState } from 'react'
import { WaveSurfer, WaveForm } from 'wavesurfer-react'

import { EditedChannelItem, StreamElements } from '../../@types/types'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { sortByKey } from '../../utils/general'
import FilePickerRow from './FilePickerRow'

interface IProps {
  files: StreamElements.UploadedFile[]
  selectedFile: StreamElements.UploadedFile | 'new' | undefined
  setSelectedFile: (file: StreamElements.UploadedFile | 'new' | undefined) => void
  fileInputRef: React.LegacyRef<HTMLInputElement>
  item: EditedChannelItem | undefined
  volume: number
}

const FilePicker = ({
  files,
  selectedFile,
  setSelectedFile,
  fileInputRef,
  item,
  volume
}: IProps) => {
  const [playing, setPlaying] = useState(false)
  const [playPosition, setPlayPosition] = useState(0)
  const [showFileList, setShowFileList] = useState(false)

  const [query, setQuery] = useState<string>('')
  const [filteredResults, setFilteredResults] = useState<StreamElements.UploadedFile[] | null>(null)

  const wavesurferRef = React.useRef<any>(null)
  const handleWSMount = React.useCallback(
    waveSurfer => {
      wavesurferRef.current = waveSurfer

      if (wavesurferRef.current && selectedFile !== 'new' && selectedFile?.url) {
        wavesurferRef.current.load(selectedFile?.url)

        wavesurferRef.current.on('play', () => {
          setPlaying(true)
        })

        wavesurferRef.current.on('pause', () => {
          setPlaying(false)
        })

        wavesurferRef.current.on('finish', () => {
          setPlaying(false)
        })

        wavesurferRef.current.on('seek', () => {
          setPlayPosition(wavesurferRef.current.getCurrentTime())
        })

        wavesurferRef.current.on('audioprocess', () => {
          setPlayPosition(wavesurferRef.current.getCurrentTime())
        })
      }
    },
    [selectedFile]
  )

  const fileListRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(fileListRef, () => setShowFileList(false))

  const playSound = React.useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    if (wavesurferRef.current && selectedFile !== 'new' && selectedFile?.url) {
      wavesurferRef.current.load(selectedFile?.url)
    }
  }, [selectedFile])

  useEffect(() => {
    if (!query || query.length === 0) {
      setFilteredResults(null)
    }

    const newResults = files.filter(f => f.name.toUpperCase().includes(query.toUpperCase()))
    setFilteredResults(sortByKey(newResults, 'dateCreated'))
  }, [query, files])

  return (
    <div className="item-wrapper file" ref={fileListRef}>
      <div className="inner-wrapper">
        {!selectedFile || selectedFile === 'new' ? (
          <div className="file-tag drop">
            <input
              type="file"
              id="sound"
              name="sound"
              accept="audio/mp3,audio/aac,audio/wav,audio/ogg"
              ref={fileInputRef}
              onChange={() => setSelectedFile('new')}
            />
          </div>
        ) : (
          <>
            <button
              className="button small secondary"
              type="button"
              onClick={() => setSelectedFile(undefined)}
            >
              <i className="icon fas fa-times" />
            </button>
            <div className="file-tag">
              <button
                className="play-button"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (item?.alert?.audio?.src) {
                    playSound()
                  }
                }}
              >
                {playing ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
              </button>
              <div className="detail-rows">
                <div className="name">
                  <i className="icon fas fa-file-audio" />
                  <span className="subtitle">{selectedFile?.name}</span>
                </div>
                <div className="duration">
                  <i className="icon fas fa-music" />
                  {item?.duration ? (
                    `${
                      playPosition !== 0 &&
                      Math.round(playPosition * 10) / 10 !== Math.round(item?.duration * 10) / 10
                        ? `${Math.round(playPosition * 10) / 10}s / `
                        : ''
                    }${Math.round(item.duration * 10) / 10}s`
                  ) : (
                    <i className="fas fa-spin fa-spinner" />
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="waveform">
                  <WaveSurfer onMount={handleWSMount} ref={wavesurferRef}>
                    <WaveForm
                      id={`waveform-${selectedFile?._id}`}
                      container={`waveform-${selectedFile?._id}`}
                      p
                      cursorColor="#ff000000"
                      waveColor="#BDBABD"
                      progressColor="#FFFFFF"
                      height={35}
                      barWidth={1}
                      barHeight={3}
                      cursorWidth={1}
                      hideScrollbar={true}
                    />
                  </WaveSurfer>
                </div>
              )}
            </div>
          </>
        )}
        <button
          className="button secondary showAll"
          type="button"
          onClick={() => setShowFileList(!showFileList)}
        >
          <i className={`icon fas fa-${showFileList ? 'angle-up' : 'angle-down'}`} />
          <span>All files</span>
        </button>
      </div>
      {showFileList && (
        <div className="file-list">
          <div className="search-header">
            <input
              placeholder="Search by sound name"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span>
              {filteredResults?.length
                ? `${filteredResults.length} results`
                : `Showing all ${files.length} files`}
            </span>
          </div>
          <div className="list">
            {(filteredResults || files).map(f => (
              <FilePickerRow
                key={f._id}
                item={f}
                selectedFile={selectedFile === 'new' ? undefined : selectedFile}
                handleOnClick={file => setSelectedFile(file)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilePicker
