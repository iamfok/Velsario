'use client'

import { useState } from 'react'
import { Plus, Edit, ShieldCheck, User, X } from 'lucide-react'

const initialUsers = [
  {
    id: 'USR-001',
    name: 'Super Admin',
    email: 'admin@velsario.com',
    role: 'Super Admin',
    status: 'Active',
  },
  {
    id: 'USR-002',
    name: 'Manager',
    email: 'manager@velsario.com',
    role: 'Manager Admin',
    status: 'Active',
  },
  {
    id: 'USR-003',
    name: 'Content Admin',
    email: 'content@velsario.com',
    role: 'Content Admin',
    status: 'Active',
  },
]

const rolePermissions: Record<string, string[]> = {
  'Super Admin': [
    'Full access',
    'Manage users',
    'Manage products',
    'Manage orders',
    'Manage settings',
  ],
  'Manager Admin': [
    'Manage products',
    'Manage orders',
    'Manage customers',
    'View analytics',
  ],
  'Content Admin': [
    'Add products',
    'Edit products',
    'Manage content',
    'Manage banners',
  ],
}

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Content Admin')

  const addUser = () => {
    if (!name.trim() || !email.trim()) return

    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Active',
    }

    setUsers([...users, newUser])

    setName('')
    setEmail('')
    setRole('Content Admin')
    setShowForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Management
          </p>

          <h1 className="text-2xl font-medium">
            Users & Access
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage admin users and their access levels.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Admin
        </button>

      </div>

      {/* ADD USER */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <div className="flex items-center justify-between mb-5">

            <p className="text-xs tracking-widest uppercase font-medium">
              Add New Admin
            </p>

            <button
              onClick={() => setShowForm(false)}
              className="p-1 text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >
              <option>Super Admin</option>
              <option>Manager Admin</option>
              <option>Content Admin</option>
            </select>

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addUser}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Create Admin
            </button>

          </div>

        </div>
      )}

      {/* USERS */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  User
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Permissions
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* USER */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={17} className="text-gray-500" />
                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {user.name}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <ShieldCheck size={15} />

                      <span className="text-xs">
                        {user.role}
                      </span>

                    </div>

                  </td>

                  {/* PERMISSIONS */}
                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-1 max-w-xs">

                      {(rolePermissions[user.role] || []).slice(0, 3).map(
                        (permission) => (
                          <span
                            key={permission}
                            className="bg-gray-100 px-2 py-1 text-[10px] text-gray-600"
                          >
                            {permission}
                          </span>
                        )
                      )}

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span className="inline-flex bg-green-50 text-green-700 px-3 py-1 text-xs">
                      {user.status}
                    </span>

                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit user"
                      >
                        <Edit size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ACCESS LEVEL INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        {Object.entries(rolePermissions).map(([roleName, permissions]) => (

          <div
            key={roleName}
            className="bg-white border border-v-border p-5"
          >

            <div className="flex items-center gap-2 mb-4">

              <ShieldCheck size={17} />

              <h3 className="text-sm font-medium">
                {roleName}
              </h3>

            </div>

            <div className="space-y-2">

              {permissions.map((permission) => (

                <p
                  key={permission}
                  className="text-xs text-v-gray"
                >
                  ✓ {permission}
                </p>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
