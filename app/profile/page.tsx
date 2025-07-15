'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface UserProfile {
  displayName: string;
  photoURL: string;
  bio: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    photoURL: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setProfile({
              displayName: userData.displayName || user.displayName || '',
              photoURL: userData.photoURL || user.photoURL || '',
              bio: userData.bio || '',
            });
          } else {
            // Create user document if it doesn't exist
            const initialData = {
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              bio: '',
              email: user.email,
              createdAt: new Date(),
            };
            await updateDoc(userDocRef, initialData);
            setProfile({
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              bio: '',
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          toast.error('Failed to load profile data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!loading && user) {
      fetchProfile();
    } else if (!loading && !user) {
      window.location.href = '/';
    }
  }, [user, loading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      let photoURL = profile.photoURL;
      
      // Upload image if a new one was selected
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }
      
      // Update profile in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        displayName: profile.displayName,
        photoURL,
        bio: profile.bio,
        updatedAt: new Date(),
      });
      
      setProfile({
        ...profile,
        photoURL,
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chat
          </Link>
          <ThemeToggle />
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information and profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={imagePreview || profile.photoURL} />
                <AvatarFallback>{profile.displayName?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="picture" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                  Change Profile Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                placeholder="Your display name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="A short bio about yourself"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-100 dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveProfile} 
              disabled={isSaving} 
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 