'use client';

import React, { useState, useEffect } from 'react';
import { userApi } from '@/lib/userApi';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userApi.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      {profile ? (
        <div className="flex items-center space-x-6">
          <FaUserCircle className="text-7xl text-gray-400" />
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-md text-gray-600">{profile.email}</p>
            <p className="text-md text-gray-600">{profile.phone}</p>
          </div>
        </div>
      ) : <p>Loading profile...</p>}
    </div>
  );
};

export default ProfilePage;
