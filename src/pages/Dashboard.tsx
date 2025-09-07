import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0a0a18]/95 backdrop-blur-xl border border-purple-500/20 rounded-lg shadow-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/70">
              Welcome to the admin control panel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/admin/panel" className="bg-[#8080ff]/10 border border-[#8080ff]/20 rounded-lg p-6 hover:bg-[#8080ff]/20 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">
                Event Management
              </h3>
              <p className="text-white/70 text-sm">
                Manage events with full CRUD operations
              </p>
            </Link>

            <div className="bg-[#8080ff]/10 border border-[#8080ff]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                User Management
              </h3>
              <p className="text-white/70 text-sm">
                Manage users and permissions
              </p>
            </div>

            <div className="bg-[#8080ff]/10 border border-[#8080ff]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Analytics
              </h3>
              <p className="text-white/70 text-sm">
                View site statistics
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Admin Information
            </h2>
            <div className="space-y-2">
              <p className="text-white/80">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-white/80">
                <span className="font-medium">Role:</span> {user?.role}
              </p>
              <p className="text-white/80">
                <span className="font-medium">Status:</span> 
                <span className="text-green-400 ml-1">
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard