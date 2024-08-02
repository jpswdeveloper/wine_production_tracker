import React, { useState } from 'react'

function DrawerDemo ({
  isDrawerOpen: open,
  setIsDrawerOpen: setOpen
}: {
  isDrawerOpen: boolean
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(open)

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  console.log('open', open, isDrawerOpen)
  return (
    <div className='drawer drawer-end'>
      <input
        id='my-drawer-4'
        type='checkbox'
        className='drawer-toggle'
        checked={isDrawerOpen}
        readOnly
      />
      <div className='drawer-content'>
        {/* Page content here */}
        {/* Your button or other element to trigger the drawer */}
        {/* <button onClick={handleDrawerToggle}>Toggle Drawer</button> */}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DrawerDemo
